# React Native Firebase Login with Context (Expo)

The collaborative event app is a platform that aims to enhance the user experience in collaborative events such as conferences, fairs, festivals, and other social gatherings. It is designed to help participants interact and connect more effectively before, during, and after the event.

The app features an event calendar, a map of the event venue, a list of speakers, a news feed, a direct messaging system, discussion groups, and a voting system for sessions or activities.

Users can customize their experience according to their preferences by selecting relevant sessions and activities that align with their interests and skills, as well as connecting with other participants who share similar interests.

Furthermore, the collaborative event app provides an easy way for organizers to communicate with participants in real-time, providing updates and important information about the event, such as schedule changes, cancellations, or other important details.

In summary, the collaborative event app is a powerful tool for enhancing the user experience in collaborative events, fostering interaction and connection among participants, and enabling them to make the most out of their social and professional event experiences.

This repository contains a React Native app that implements a Firebase login functionality using Context.

## Features

- User authentication using Firebase Authentication
- Secure storage of user credentials
- Context API for managing user authentication state
- Navigation between login and home screens
- Calendar: A dedicated page that allows users to view and manage event schedules.
- Chat: A chat functionality where participants can engage in real-time conversations with each other. Users can join different chat rooms or create new ones, exchange messages, share information, and collaborate with fellow participants.
- Posts: A page where users can create, view, and interact with posts related to the event. Participants can share their thoughts, ask questions, provide feedback, and engage in discussions with other attendees. It provides a platform for exchanging ideas, fostering community interaction, and enhancing networking opportunities.

These features enable seamless communication, collaboration, and information sharing among event participants, making the app a valuable tool for enhancing the overall event experience.

## Installation

1. Clone the repository: `git clone https://github.com/dgrezzi/appFicoo`
2. Navigate to the project directory: `cd appFicoo`
3. Install dependencies: `npm install` or `yarn install`
4. Set up Firebase project and obtain your Firebase configuration
5. Create a `.env` file in the project root directory and add your Firebase configuration as environment variables. For example:

```
API_KEY=your-api-key
AUTH_DOMAIN=your-auth-domain
DATABASE_URL=your-database-url
```

## Usage

Run the app using Expo with the following command:

```Javascript
expo start
```

This will open the Expo developer tools in your browser. From there, you can launch the app on an Android or iOS device or simulator.

## ScreenShot

<center>

![Adobe Logo](./src/assets/screen1.png 'Hover text')

</center>
<center>

![Adobe Logo](./src/assets/screen2.png 'Hover text')

</center>

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

**Note:** Remember to update the Firebase configuration with your own credentials before running the app.
