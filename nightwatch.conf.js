module.exports = {
  "src_folders": ["test/functional"],
  "page_objects_path" : "test/functional/pages",
  "output_folder" : "reports",
  "selenium" : {
    "start_process" : true,
    "server_path" : "node_modules/selenium-server/lib/runner/selenium-server-standalone-3.4.0.jar",
    "port" : 4444
  },

  "test_settings" : {
    "default" : {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "phantomjs.binary.path" : "node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs",
      },
      "cli_args" : {
        "webdriver.chrome.driver" : "node_modules/chromedriver/lib/chromedriver/chromedriver"
      },
//      "launch_url" : "http://192.168.33.15:3000",
      "selenium_port"  : 4444,
      "selenium_host"  : "localhost",
      "silent": true,
      "screenshots" : {
        "enabled" : false,
        "path" : "test/functional/screenshots"
      }
    },
    "phantomjs": {
      "desiredCapabilities": {
        "browserName": "phantomjs",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "phantomjs.binary.path" : "node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs",
      },
      "screenshots" : {
        "enabled" : true,
        "on_failure" : true,
        "on_error" : true,
        "path" : "test/functional/screenshots"
      }
    }
  }
}
