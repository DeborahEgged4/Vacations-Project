class Config {
    public WebPort = 8080;
    public myWebhost = "localhost";

    public mySQLhost = "localhost";
    public mySQLuser = "root";
    public mySQLpass = "12345678";
    public mySQLdatabase = "project3";
  }
  
  const config = new Config()
  export default config;