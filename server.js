var http = require('http');
var fs = require('fs');

//tao userName và password
var credentials = {
    userName: "nhom10",
    password: "12345"
};

var realm = 'Basic Authentication';
 
//Thong bao khi xac thuc
function authenticationStatus(resp) {
    resp.writeHead(401, { 'WWW-Authenticate': 'Basic realm="' + realm + '"' });
    resp.end('Authorization is needed');
 
};
 
// Tao server
var server = http.createServer(function (request, response) {
    var authentication, loginInfo;
 
    // Neu truy cap trang chu
    if (request.url == '/'){
        // Tra ve link den trang index
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<html>');
        response.write('<head>');
        response.write('<title>3D image with Group 10 </title>');
        response.write('</head>');
        response.write('<body> <a href="/index">Go to our 3D image<h1> </a>');
        response.write('</html>');
        response.end();
    
    } else if (request.url == '/index') { //Truy cap trang index
        //Xac thuc nguoi dung
        if (!request.headers.authorization) {
            authenticationStatus (response);
            return;
        }
     
        authentication = request.headers.authorization.replace(/^Basic/, '');
     
        authentication = (new Buffer(authentication, 'base64')).toString('utf8');
     
        loginInfo = authentication.split(':');
     
        // Neu dung, hien thi file index
        if (loginInfo[0] === credentials.userName && loginInfo[1] === credentials.password) {
            response.writeHead(200, {
                "Context-type" : "text/html"
            });
             
            // Show thông tin trang index
            fs.createReadStream('./index.html').pipe(response);
            
        }
    }

    else // Nguoc lai, khong tim thay trang, thong bao loi
    {
        response.writeHead(404, {
            "Context-type" : "text/plain"
        });
        
        response.write('404 Not Found ' + request.url);
         
        response.end();
    }
});
 
server.listen(1040);
console.log("Server dang hoat dong tai cong 1040");