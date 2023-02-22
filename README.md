# Integrado_teste_backend
## <b> Install Develop </b>


| Nº | Step  |
| ---: | ---------- |
|    1 | `Clonar o repositório `|
|    2 | $>   `docker compose up -d dev`   |
|    3 | Caso nescessário: $>  `docker compose exec dev npm install`        |
|    4 | Caso acessar $>  `docker compose exec -it dev  bash`        |
|    5 | Iniciar o banco $>  `docker compose exec dev npm run create_database`        |
|    6 | Stop: $>  `docker compose down`        |

## <b> Install Production</b>


| Nº | Step  |
| ---: | ---------- |
|    1 | `Clonar o repositório `|
|    2 | $>   `docker compose config -o deploy-compose.yaml prod`   |
|    3 | $>  `docker compose -f deploy-compose.yaml up `        |
|    4 | Caso nescessário $>  `docker compose exec prod npm run create_database`        |
|    5 | Caso acessar $>  `docker compose exec -it prod  bash`        |
|    6 | Logs $>  `docker compose exec -it prod  pm2 monit`        |
|    7 |Stop: $>  `docker compose down`  
  
<br>

##  <div><p> <img align="center" alt="djdanielsecco-Vscode" height="20" width="" src="https://avatars.githubusercontent.com/u/7658037?s=200&v=4">   <b> Documentação: </b></p></div>

Link para Swagger:
```
http://localhost:3000/docs
```

Task Scheduling :
<br>
`
Cron Job todos os dias as 23:59 horario UTC -3
`

Pode ser alterado em backend/src/job.task.ts:72 :
``` ts 
  @Cron('0 59 23 * * *', {
    name: 'Get Universities',
    timeZone: 'America/Sao_Paulo',
  })
  async handleCron() {
    await this.start();
  }
```
# Observações:
-Infra estrutura dos containers não esta dimencionada deacordo com a instancia que vai ser usada como cpu | memória | networks | volumes. 

-O banco de dados não está configurado com acessos e privilégios e nem configurado para rodar em uma vcp da aws.


<div style="display: inline_block"><br>
  <img align="center" alt="djdanielsecco-Node" height="60" width="80" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-plain-wordmark.svg">
  <img align="center" alt="djdanielsecco-Node" height="60" width="80" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-plain-wordmark.svg">
  <img align="center" alt="djdanielsecco-Node" height="60" width="80" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-plain-wordmark.svg">
  <img align="center" alt="djdanielsecco-Js" height="60" width="80" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center" alt="djdanielsecco-Ts" height="60" width="80" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg">
  <img align="center" alt="djdanielsecco-Ts" height="60" width="80" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-plain.svg">
  <img align="center" alt="djdanielsecco-Vscode" height="60" width="80" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original-wordmark.svg">
  <img align="center" alt="djdanielsecco-Vscode" height="60" width="80" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/apple/apple-original.svg">
  <img align="center" alt="djdanielsecco-Vscode" height="60" width="" src="https://avatars.githubusercontent.com/u/7658037?s=200&v=4">
</div>

 ### Saiba mais:
<div> 
   <a href="https://www.linkedin.com/in/daniel-secco-zanotto-5932b532/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
  <a href = "mailto: djdanielsecco1@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://instagram.com/djdanielseccooficial" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a>
 <a href="https://twitter.com/djdanielsecco" target="_blank"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" target="_blank"></a>


 
</div>

 
