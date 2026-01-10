import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import * as crypto from 'crypto'

// GitHub Pages の公開パス: https://naoji3x.github.io/grandma-candy-shop/
const base = '/grandma-candy-shop/'

const hashCode = (code: string): string =>
  crypto.createHash('md5').update(code).digest('hex').slice(0, 8)

type SidebarItem = {
  text?: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

// link から末尾要素（拡張子なし想定）を取り出す："/foo/010-bar" -> "010-bar"
const getBaseFromLink = (link?: string): string => {
  if (!link) return ''
  const clean = link.split('#')[0].replace(/\/+$/, '')
  return clean.split('/').pop() ?? ''
}

// "xxx-" を削除（xxx は英小文字）
const stripLeadingXxxDash = (label: string): string => {
  return label.replace(/^[a-z]+-/, '')
}

// 判定：README / *rules / *instruction
const isReadme = (item: SidebarItem): boolean => {
  return getBaseFromLink(item.link).toLowerCase() === 'readme'
}

const isRules = (item: SidebarItem): boolean => {
  return getBaseFromLink(item.link).toLowerCase().endsWith('rules')
}

const isInstruction = (item: SidebarItem): boolean => {
  return getBaseFromLink(item.link).toLowerCase().endsWith('instruction')
}

// ソート用のキー：
// 1) README（最優先）
// 2) *rules（次）
// 2) *instruction（次）
// 3) その他：先頭 xxx- を削除した名前でファイル名順
const sortKey = (item: SidebarItem): { bucket: number; name: string } => {
  if (isReadme(item)) return { bucket: 0, name: '' }
  if (isRules(item)) return { bucket: 1, name: getBaseFromLink(item.link).toLowerCase() }
  if (isInstruction(item)) return { bucket: 2, name: getBaseFromLink(item.link).toLowerCase() }
  return { bucket: 3, name: stripLeadingXxxDash(getBaseFromLink(item.link)).toLowerCase() }
}

const normalizeLink = (link?: string): string | undefined => {
  if (!link) return link

  // hash は保持して、パス部分だけ正規化
  const [path, hash] = link.split('#')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return hash ? `${normalizedPath}#${hash}` : normalizedPath
}

// 再帰的に：instruction除外、表示名整形（xxx-削除）、並び替え
const transformSidebar = (items: SidebarItem[]): SidebarItem[] => {
  const transformed = items.map(it => {
    const next: SidebarItem = { ...it }

    // prev/next 解決
    if (next.link) next.link = normalizeLink(next.link)

    // 子も同じルールで処理
    if (next.items) next.items = transformSidebar(next.items)

    // 表示テキストの先頭 xxx- を削除（README も rules も含めて削除してOKならこのまま）
    if (
      typeof next.text === 'string' &&
      next.text.trim().length > 0 &&
      !isReadme(next) &&
      !isRules(next) &&
      !isInstruction(next)
    ) {
      next.text = stripLeadingXxxDash(next.text)
    }

    return next
  })

  transformed.sort((a, b) => {
    const ka = sortKey(a)
    const kb = sortKey(b)
    if (ka.bucket !== kb.bucket) return ka.bucket - kb.bucket
    return ka.name.localeCompare(kb.name, 'ja')
  })

  return transformed
}

export default defineConfig({
  title: 'Grandma Candy Shop Docs',
  description: 'Documentation for Grandma Candy Shop',
  base,

  themeConfig: {
    sidebar: transformSidebar(
      generateSidebar({
        documentRootPath: 'docs',
        scanStartPath: '.',
        useTitleFromFileHeading: false,
        collapseDepth: 2,
        collapsed: true,
      }) as SidebarItem[]
    ),
  },

  markdown: {
    //
    // ```mermaid ... ``` のコードブロックを
    // <img src="/mermaid/<hash>.svg"> に差し替える
    // （Markdownファイルは書き換えない。HTML生成時だけ差し替え）
    //
    config: md => {
      // front matter の title を先頭H1として注入（既にH1があれば何もしない）
      md.core.ruler.after('block', 'frontmatter-h1', (state: any) => {
        const fmTitle = state.env?.frontmatter?.title
        if (!fmTitle) return

        const hasH1 = state.tokens.some((t: any) => t.type === 'heading_open' && t.tag === 'h1')
        if (hasH1) return

        const Token = state.Token
        const open = new Token('heading_open', 'h1', 1)
        open.markup = '#'
        open.block = true

        const inline = new Token('inline', '', 0)
        inline.content = String(fmTitle)
        inline.children = []

        const close = new Token('heading_close', 'h1', -1)
        close.markup = '#'
        close.block = true

        // 文書の先頭に H1 を差し込む
        state.tokens.unshift(close)
        state.tokens.unshift(inline)
        state.tokens.unshift(open)
      })

      // インラインコード `...` は必ず v-pre を付けて出力
      //    → `{{ ... }}` を Vue がパースしなくなる
      md.renderer.rules.code_inline = (tokens, idx) => {
        const token = tokens[idx]
        const content = md.utils.escapeHtml(token.content)
        return `<code v-pre>${content}</code>`
      }

      const defaultFence = md.renderer.rules.fence

      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const info = (token.info || '').trim()

        if (info === 'mermaid') {
          const code = token.content.trim()
          const id = hashCode(code)
          const src = `/mermaid/${id}.svg`

          // 800x800 を超える場合はスクロールさせるためのラッパーを用意
          // 具体的な判定は CSS / JS 側で行う想定（ここではクラスだけ付与）
          return `
              <p class="mermaid-container">
                <img src="${src}" alt="mermaid diagram" loading="lazy" class="mermaid-image">
              </p>\n`
        }

        // それ以外のコードブロックはデフォルトの描画
        return defaultFence
          ? defaultFence(tokens, idx, options, env, self)
          : self.renderToken(tokens, idx, options)
      }
    },
  },
})
