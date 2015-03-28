//This is how I wrote
var walk_the_DOM = function(node, func){
  func(node);
  
  node = node.firstChild;
  while(node){
    walk_the_DOM(node, func);
    node = node.nextSibling;
  }
};

var getElementsByAttribute = function(att, value){
  var results = [];
  
  walk_the_DOM(document.body, function(node){
    var actual = node.nodeType === 1 && node.getAttribute(att);
    
    if(typeof actual === 'string' && (actual === value || typeof value !=- 'string'))
      {
        results.push(node);
      }
  });
  
  return results;
};

var main = function(){
	var res = getElementsByAttribute("class","testClass");
	console.log(res);
}