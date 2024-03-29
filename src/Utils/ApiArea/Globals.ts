class Globals {}

class DevelopmentGlobals extends Globals {
  public urls = {
    // kittens: "https://raw.githubusercontent.com/KobiShashs/Caas-Resources/master/cats.json"
    authors: "http://localhost:8080/api/v3/library/",
    books: "http://localhost:8080/api/v3/books/",
    users: "http://localhost:8080/api/v3/user/",
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    authors: "http://localhost:8080/api/v3/library/",
    books: "http://localhost:8080/api/v3/books/",
    users: "http://localhost:8080/api/v3/user/",
  };
}

const globals =
  process.env.NODE_ENV === "production"
    ? new ProductionGlobals()
    : new DevelopmentGlobals();

export default globals;
