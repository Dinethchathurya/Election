import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from 'declarations/Election_backend';
import { canisterId } from 'declarations/Election_backend/index.js';

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app' // Mainnet
    : 'http://br5f7-7uaaa-aaaaa-qaaca-cai.localhost:4943/'; // Local

const AuthPage = () => {
  const [state, setState] = useState({
    actor: undefined,
    authClient: undefined,
    isAuthenticated: false,
    principal: 'Click "Whoami" to see your principal ID'
  });

  useEffect(() => {
    // Load any saved principal from sessionStorage
    const savedPrincipal = sessionStorage.getItem("principal");
    if (savedPrincipal) {
      setState((prev) => ({
        ...prev,
        principal: savedPrincipal
      }));
    }
    updateActor();
  }, []);

  const updateActor = async () => {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const actor = createActor(canisterId, {
      agentOptions: { identity }
    });
    const isAuthenticated = await authClient.isAuthenticated();

    setState((prev) => ({
      ...prev,
      actor,
      authClient,
      isAuthenticated
    }));
  };

  const login = async () => {
    await state.authClient.login({
      identityProvider,
      onSuccess: updateActor
    });
  };

  const logout = async () => {
    await state.authClient.logout();
    sessionStorage.removeItem("principal"); // ❌ Clear session on logout
    updateActor();
  };

  const whoami = async () => {
    setState((prev) => ({
      ...prev,
      principal: 'Loading...'
    }));

    const result = await state.actor.whoami();
    const principal = result.toString();

    // ✅ Store in sessionStorage
    sessionStorage.setItem("principal", principal);

    setState((prev) => ({
      ...prev,
      principal
    }));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Who Am I?</h1>

      {!state.isAuthenticated ? (
        <button className="btn btn-primary me-3" onClick={login}>
          Login with Internet Identity
        </button>
      ) : (
        <button className="btn btn-danger me-3" onClick={logout}>
          Logout
        </button>
      )}

      <button className="btn btn-secondary" onClick={whoami}>
        Whoami
      </button>

      {state.principal && (
        <div className="mt-4">
          <h4>Your principal ID:</h4>
          <pre>{state.principal}</pre>
        </div>
      )}
    </div>
  );
};

export default AuthPage;