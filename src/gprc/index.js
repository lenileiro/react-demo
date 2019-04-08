const hello = require('./services/hello')

let response = hello(14, "sam", "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE1NTI3Njg1NTcsImlhdCI6MTU1Mjc2Njc1NywibmFtZSI6InNhbSJ9.fbCadO2-qCPeU3gbeYozoegf_RHx0VDXEINNBz-xqkW-Koewl3ZfhPky6b6yg98wmGCRSV5ztnd7108Y79tozJNV4hDQwyjp8J2MgfwGvN6WkTZdEpNWwb0NSoSlxOueKYF9k3MD2XVE6zcgmWRYV6hg94P4WOxubY0m4UL8KWJ_ir2gKyHUpU5WuKxrLYKpBFhxjIjmt6eJzNyA7tRTaKNTvHbn5ewId24Vw4qSn8Nykv9tjjM60KdS6Ex723jfzGYJGi-P22LGhNjF9pdn83wSgu7nzCiMXl-jxxn6LEYatAc2-EFw0J6TJSNhJWaGpC3keB0wtbz5lTxpPMJXgw")

response.then(data => {
    console.log('Client:', data)

}).catch(err => {
    console.error("error: "+err.details)
})