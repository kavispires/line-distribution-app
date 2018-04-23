import React from 'react';

const LoginRequiredScreen = ({props, redirect = 'home'}) => {
  console.log(props);
  return (
    <section className="container container-loading">
      <main>
        You must be loggin to access this page.
        <button
          className="btn-home"
          onClick={props.login}
        >
          Sign-in now
        </button>
      </main>
    </section>
  );
}


export default LoginRequiredScreen;
