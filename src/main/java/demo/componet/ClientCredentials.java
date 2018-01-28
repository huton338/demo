package demo.componet;

public class ClientCredentials {

    /** Value of the "API key" shown under "Simple API Access". */
    static final String API_KEY ="AIzaSyCPCFGva7-aJF4i2k_0zP9OQATn_LXWgxk";

    static void errorIfNotSpecified() {
      if (API_KEY.startsWith("Enter ")) {
        System.err.println(API_KEY);
        System.exit(1);
      }
    }
}
