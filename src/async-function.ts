import * as core from '@actions/core'
import {Context} from '@actions/github/lib/context'
import {GitHub} from '@actions/github/lib/utils'
import * as io from '@actions/io'
import * as fetch from 'node-fetch'

const AsyncFunction = Object.getPrototypeOf(async () => null).constructor

type AsyncFunctionArguments = {
  context: Context
  core: typeof core
  github: InstanceType<typeof GitHub>
  io: typeof io
  require: NodeRequire
  fetch: typeof fetch
}

export function callAsyncFunction<T>(
  args: AsyncFunctionArguments,
  source: string
): Promise<T> {
  const fn = new AsyncFunction(...Object.keys(args), source)
  return fn(...Object.values(args))
}
