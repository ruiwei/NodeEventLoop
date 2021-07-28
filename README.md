# Node Event Loop Blocking and Non Blocking Examples

Examples for blocked code, none block by partition and offload

##### How To Run

1. Run "tsc" first (install Typescript if not already installed)
2. Run "node server.js" or "nodemon server.js"

##### Examples:

Main Entry:

​	http://localhost:999

Blocked:

​	http://locahost:999/blocked
​	Main Entry is blocked before this request done

Partition:

​	http://localhost:999/partition

Offload (worker):

​	http://localhost:999/worker