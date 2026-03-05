import { Command } from 'commander'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import dotenv from 'dotenv'

export type DojoConfig = {
  version: 1
  projects: Record<string, string>
}

export type ConfigLoadResult = {
  configPath: string
  config: DojoConfig | null
}

export function loadEnv(): void {
  // Load .env from repo root (current working directory)
  // Safe if missing.
  dotenv.config({ path: resolve(process.cwd(), '.env') })
}

export function defaultConfigPath(): string {
  return resolve(process.cwd(), 'dojo.config.json')
}

export function loadConfig(): ConfigLoadResult {
  loadEnv()

  const configPath = defaultConfigPath()
  if (!existsSync(configPath)) {
    return { configPath, config: null }
  }

  const raw = readFileSync(configPath, 'utf8')
  const parsed = JSON.parse(raw) as DojoConfig

  if (!parsed || parsed.version !== 1 || typeof parsed.projects !== 'object') {
    throw new Error(`Invalid dojo.config.json: expected { version: 1, projects: { ... } }`)
  }

  return { configPath, config: parsed }
}

export function writeConfig(config: DojoConfig): void {
  const configPath = defaultConfigPath()
  writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf8')
}

export function registerConfigCommands(program: Command): void {
  const cfg = program.command('config').description('Config helpers (dojo.config.json)')

  cfg
    .command('init')
    .description('Create dojo.config.json template (does not overwrite existing)')
    .action(() => {
      const { configPath, config } = loadConfig()
      if (config) {
        process.stdout.write(`Already exists: ${configPath}\n`)
        return
      }
      const template: DojoConfig = {
        version: 1,
        projects: {
          'prj-0001': 'docs/ja/project/prj-0001/040-project-management/020-schedule',
        },
      }
      writeConfig(template)
      process.stdout.write(`Created: ${configPath}\n`)
    })
}

export function registerProjectCommands(program: Command): void {
  const pj = program.command('project').description('Project registry commands')

  pj.command('list')
    .description('List projects from dojo.config.json')
    .action(() => {
      const { configPath, config } = loadConfig()
      if (!config) {
        process.stdout.write(`No config found: ${configPath}\n`)
        process.stdout.write(`Run: dojo config init\n`)
        process.exitCode = 1
        return
      }

      const entries = Object.entries(config.projects).sort((a, b) => a[0].localeCompare(b[0]))
      if (entries.length === 0) {
        process.stdout.write(`No projects in ${configPath}\n`)
        return
      }

      for (const [id, path] of entries) {
        process.stdout.write(`${id}\t${path}\n`)
      }
    })
}
