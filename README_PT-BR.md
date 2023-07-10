# React Native Firebase Login com Context

O aplicativo colaborativo para eventos é uma plataforma que visa melhorar a experiência do usuário em eventos colaborativos, como conferências, feiras, festivais e outros encontros sociais. Ele é projetado para ajudar os participantes a interagirem e se conectarem de forma mais eficaz antes, durante e depois do evento.

O aplicativo tem recursos como um calendário de eventos, um mapa do local do evento, uma lista de palestrantes, um feed de notícias, um sistema de mensagens diretas, grupos de discussão e um sistema de votação para sessões de palestras ou atividades.

Os usuários podem personalizar sua experiência de acordo com suas preferências, selecionando sessões de palestras e atividades que são relevantes para seus interesses e habilidades, e se conectando com outros participantes com interesses semelhantes.

Além disso, o aplicativo colaborativo para eventos oferece uma maneira fácil para os organizadores se comunicarem com os participantes em tempo real, fornecendo atualizações e informações importantes sobre o evento, como mudanças de horários, cancelamentos ou outras informações importantes.

Em resumo, o aplicativo colaborativo para eventos é uma ferramenta poderosa para melhorar a experiência do usuário em eventos colaborativos, aumentando a interação e a conexão entre os participantes e permitindo que eles tirem o máximo proveito de suas experiências em eventos sociais e profissionais.

## ScreenShot

<center>

![Adobe Logo](./src/assets/Screenshot.png 'Hover text')

</center>

## Instalação

Antes de começar, certifique-se de ter instalado o [Node.js](https://nodejs.org/) e o [React Native CLI](https://reactnative.dev/docs/environment-setup). Além disso, é necessário criar um projeto no Firebase e configurar as credenciais de acesso ao banco de dados.

Para instalar as dependências do projeto, execute o seguinte comando na pasta raiz do projeto:

```bash
npm install
```

## Configuração

Antes de executar o projeto, você precisará configurar o Firebase e o Google Sign-In.

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/), se você ainda não tiver um.
2. Adicione o aplicativo ao seu projeto do Firebase. Para fazer isso, clique no botão "Adicionar aplicativo" na seção "Meus aplicativos".
3. Siga as instruções na tela para registrar seu aplicativo.
4. Faça o download do arquivo **`'google-services.json'`** do seu projeto do Firebase e adicione-o ao diretório **`'/android/app'`** do seu projeto React Native.

O arquivo **`'google-services.json'`** contém as configurações necessárias para o Google Sign-In. Sem esse arquivo, o Google Sign-In não funcionará corretamente. Certifique-se de baixar o arquivo correto para o seu projeto do Firebase e adicioná-lo ao local correto.

Depois de concluir essas etapas, você estará pronto para executar o projeto.

## Uso

Para executar o aplicativo em um dispositivo ou emulador, execute o seguinte comando na pasta raiz do projeto:

```bash
react-native run-android
```

ou

```bash
react-native run-ios
```

Isso iniciará o aplicativo no dispositivo ou emulador conectado. Você pode editar o código fonte em **`'src'`** para adicionar novos recursos ou personalizar o layout.

## Context

Este projeto utiliza o Context para gerenciar o estado global da aplicação. O arquivo **`'AuthContext.js'`** contém o Provider e o Consumer para o contexto de autenticação.

O Provider envolve o componente raiz do aplicativo (**`'App.js'`**) e fornece as funções de autenticação para serem utilizadas pelos componentes filhos.

O contexto **`'AuthContext'`** fornece as funções necessárias para autenticação com o Firebase. Para utilizar essas funções, basta importar o **`'Consumer'`** do **`'AuthContext'`** e utilizar as funções da seguinte maneira:

```js
import { useContext } from 'react';
import { AuthContext } from './src/contexts/auth';

function LoginScreen() {
  const { signIn, handleSignIn } = useContext(AuthContext);

  return (
    // ...
    <Button title="Sign in" onPress={() => handleSignIn(email, pwd)} />
    // ...
  );
}
```

As funções fornecidas pelo contexto estão localizadas em **`'/src/functions'`** e instanciadas em **`'/src/contexts/auth'`** portanto, certifique-se de importá-las corretamente em seus arquivos.

Com o contexto AuthContext, você pode facilmente adicionar autenticação ao seu aplicativo React Native usando o Firebase. As funções fornecidas pelo contexto são fáceis de usar e personalizar, permitindo que você implemente a autenticação de acordo com as necessidades do seu projeto.

## Contribuição

Sinta-se à vontade para contribuir com este projeto fazendo um pull request ou relatando problemas na seção de Issues.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
