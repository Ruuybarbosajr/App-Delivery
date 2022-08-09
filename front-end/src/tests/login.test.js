import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Teste da tela Login', () => {
  it('deve existir dois campos de input', () => {
    render(<App />);

    const passwordInput = screen.getByTestId('common_login__input-password');
    const emailInput = screen.getByTestId('common_login__input-email');

    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  it('botão é habilitado após preenchimento correto dos inputs', () => {
    render(<App />);

    const passwordInput = screen.getByTestId('common_login__input-password');
    const emailInput = screen.getByTestId('common_login__input-email');
    const btnLogin = screen.getByText('Login');

    userEvent.type(passwordInput, 'fulana@123');
    userEvent.type(emailInput, 'fulana@deliveryapp.com');

    expect(btnLogin).toBeEnabled();
  });
});
