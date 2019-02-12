# legendei-dl

Script para download de legendas de series e filmes

Utilizo nesse script boa parte da base do `https://github.com/ravanscafi/legtv-dl` : Thanks

O script tentará baixar as legendas como séries, se não conseguir identificar, tentará como filme, a busca parte sempre pelo nome do arquivo.

Pode não funcionar como o esperado, este é um script que fiz apenas como aprendizado, valorize o site e apoie os legenders

# Dependências

É necessário ter a ferramenta [**unrar**](http://www.rarlab.com/rar_add.htm).
`unrar` deve estar disponível no seu path.

Você pode instalar no Ubuntu utilizando o comando:
```
sudo apt-get install unrar
```

No OS X, você pode utilizar [Homebrew](http://brew.sh/) e instalar com o comando:
```
brew install unrar
```

No Windows, você provavalmente precisa baixar [daqui](http://www.rarlab.com/rar_add.htm), instalar/extrair ou sei lá, e colocar o caminho no seu path.

# Instalação

1. Clone esse repositório: `git clone https://github.com/neyestrabelli/legendei-dl.git`.
1. Entre na pasta com `cd legendei-dl`.
1. Rode `npm run build` (Você vai precisar do [Node.js e npm](https://nodejs.org/))).
1. Voce pode setar o diretorio de onde ira checar as legendas no dist/config.js ou então executar passando para o comando
1. O comando `legendei-dl` estará disponível no path
1. Você poderá simplesmente executar como `legendei-dl` ou  `legendei-dl /downloads/series/`
