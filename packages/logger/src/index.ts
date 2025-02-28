import { pino } from "pino";

class Logger {
  private static instance: Logger;
  private logger = pino({
    level: process.env.LOG_LEVEL || "debug",
    transport: process.env.NODE_ENV !== "production" ? { target: "pino-pretty" } : undefined,
  });

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string, context?: string) {
    this.logger.info({ context, message });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error({ context, message, trace });
  }

  warn(message: string, context?: string) {
    this.logger.warn({ context, message });
  }

  debug(message: string, context?: string) {
    this.logger.debug({ context, message });
  }
}

// Export a single instance of the logger
const logger = Logger.getInstance();
export default logger;