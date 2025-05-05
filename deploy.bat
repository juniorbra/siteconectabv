@echo off
REM Script para implantar o site Conecta Botvance
REM Uso: deploy.bat [production|staging]

REM Definir variáveis
set ENVIRONMENT=%1
if "%ENVIRONMENT%"=="" set ENVIRONMENT=production
set CONTAINER_NAME=siteconectabotvance

echo Iniciando implantação para ambiente: %ENVIRONMENT%

REM Verificar se o Docker está instalado
where docker >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Docker não está instalado. Por favor, instale o Docker primeiro.
    exit /b 1
)

REM Verificar se o Docker Compose está instalado
where docker-compose >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro.
    exit /b 1
)

REM Parar contêiner existente se estiver rodando
docker ps -q -f name=%CONTAINER_NAME% >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Parando contêiner existente...
    docker-compose down
)

REM Construir a imagem Docker
echo Construindo a imagem Docker...
docker-compose build

REM Iniciar o contêiner
echo Iniciando o contêiner...
docker-compose up -d

REM Verificar se o contêiner está rodando
docker ps -q -f name=%CONTAINER_NAME% >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Implantação concluída com sucesso!
    echo O site está disponível em: http://localhost
    
    if "%ENVIRONMENT%"=="production" (
        echo Lembre-se de configurar seu domínio para apontar para este servidor.
        echo Para configurar HTTPS, considere usar um proxy reverso como Traefik ou Nginx Proxy Manager.
    )
) else (
    echo Erro: O contêiner não está rodando. Verifique os logs com 'docker logs %CONTAINER_NAME%'.
    exit /b 1
)

exit /b 0
