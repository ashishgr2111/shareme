This is a React learning project. I am following this guide -> https://github.com/adrianhajdin/project_shareme_social_media. But, the Google OAuth2.0 mechanism used in this repo seems to be deprecated. Therefore, I have made a few important modifications which incorporate the latest changes in Google OAuth2.0 API.

<em>**About Google Logout**<br></em>
User sign-in status for your app and a Google Account are independent. Google does not manage session state for your app. Your app should directly manage per user session state and sign-in status. Therefore, I have simply added a button for logout, which justs clears the localStorage and navigates to the login page.
