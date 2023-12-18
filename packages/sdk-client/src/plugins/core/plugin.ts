/**
 * Interface of a runnable plugin
 */
export interface PluginRunner<T, V> {
  /** Transformation function */
  transform(data: V): T | Promise<T>;
}

/**
 * Interface of an SDK plugin
 */
export interface Plugin<T, V> {
  /** Load the plugin with the context */
  load(context?: Record<string, any>): PluginRunner<T, V>;
}
