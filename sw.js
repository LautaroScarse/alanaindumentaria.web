const CACHE_NAME = "alanav1"
const = cache_urls = ["/offline/vista.html",
                      "offline/style.css",
                      "/offline/map.png"]

self.addEventListener("install",function(ev){
  console.log("SW instalada");

  caches.open(CACHE_NAME)
        .then(function(cache){
          console.log("cache opened")
          return cache.addAll(cache_urls)
        })

})


self.addEventListener("fetch",function(ev){
  console.log("Nueva peticion")
})