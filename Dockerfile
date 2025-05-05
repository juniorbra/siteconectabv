FROM nginx:alpine

LABEL maintainer="Conecta Botvance <contato@botvance.com.br>"
LABEL description="Site do Conecta Botvance - Conectores inteligentes para n8n"
LABEL version="1.0"

# Copiar os arquivos do site para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Remover arquivos que não devem ir para a imagem final
RUN rm -f /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/docker-compose.yml \
    /usr/share/nginx/html/.dockerignore \
    /usr/share/nginx/html/nginx.conf \
    /usr/share/nginx/html/README.md \
    /usr/share/nginx/html/deploy.sh

# Copiar o arquivo de configuração personalizado do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor a porta 80
EXPOSE 80

# Verificação de saúde
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
