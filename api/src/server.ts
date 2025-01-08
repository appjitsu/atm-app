import { bootstrap } from "./app.js";

(function() {
  /**
   * Main function to initialize the application.
   * @async
   */
  async function main() {
    try {
      // Bootstrap the application and get the server URL
      const { server } = await bootstrap(3000);
      console.log(`Server started at ${server}`);
    } catch (error: any) {
      // Log the error with more details
      console.error('An error occurred while starting the server:', error.message);
      // Optionally, exit the process with a failure code
      process.exit(1);
    }
  }

  main();
})();
