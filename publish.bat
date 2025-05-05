@echo off
REM Script para construir e publicar a imagem Docker no Docker Hub
REM Uso: publish.bat [tag]

REM Definir variáveis
set TAG=%1
if "%TAG%"=="" set TAG=latest
set IMAGE_NAME=hvidigaljr/siteconectabotvance
set FULL_IMAGE_NAME=%IMAGE_NAME%:%TAG%

echo Iniciando processo de publicação da imagem: %FULL_IMAGE_NAME%

REM Construir a imagem Docker
echo Construindo a imagem Docker...
docker build -t %FULL_IMAGE_NAME% .

REM Verificar se a construção foi bem-sucedida
if %ERRORLEVEL% neq 0 (
    echo Erro ao construir a imagem Docker.
    exit /b 1
)

REM Enviar a imagem para o Docker Hub
echo Enviando a imagem para o Docker Hub...
docker push %FULL_IMAGE_NAME%

REM Verificar se o envio foi bem-sucedido
if %ERRORLEVEL% neq 0 (
    echo Erro ao enviar a imagem para o Docker Hub.
    exit /b 1
)

echo Imagem %FULL_IMAGE_NAME% publicada com sucesso no Docker Hub!
echo Para implantar em um cluster Docker Swarm, use: docker stack deploy -c docker-compose.yml siteconectabotvance

exit /b 0
