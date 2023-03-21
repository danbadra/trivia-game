import React from 'react';
import { screen }from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Teste da pagina Login', () => {
  it('Testa se todos os componentes aparecem', () => {
    renderWithRouterAndRedux(<App/>);

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByRole('button', { name: 'Play' });
    const configBtn = screen.getByRole('button', { name: 'Configurações' });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(playBtn).toBeInTheDocument();
    expect(configBtn).toBeInTheDocument();
  });
  it('Testa se o botão de configurações redireciona para a pagina de configurações', async () => {
    renderWithRouterAndRedux(<App/>);

    const configBtn = screen.getByRole('button', { name: 'Configurações' });
    userEvent.click(configBtn);

    const configTitle = await screen.findByRole('heading', { name: 'Configurações', level: 1 });

    expect(configTitle).toBeInTheDocument();
  });
  it('Testa se o botão de play vai para a pagina do jogo', async () => {
    renderWithRouterAndRedux(<App/>);

    const nameInput = screen.getByLabelText('Nome:');
    const emailInput = screen.getByLabelText('Email:');

    userEvent.type(nameInput, 'alguem');
    userEvent.type(emailInput, 'teste@teste.com');

    const playBtn = screen.getByRole('button', { name: 'Play' });
    userEvent.click(playBtn);

    const playScore = await screen.findByTestId('header-score');

    expect(playScore.innerHTML).toBe("0");
  });
  it('Testa se os inputs funcionam como deveriam', () => {
    renderWithRouterAndRedux(<App/>);

    const nameInput = screen.getByLabelText('Nome:');
    const emailInput = screen.getByLabelText('Email:');

    userEvent.type(nameInput, 'alguem');
    userEvent.type(emailInput, 'teste@teste.com');

    expect(nameInput).toHaveValue('alguem');
    expect(emailInput).toHaveValue('teste@teste.com');
  });
  it('Testa se o botão play desativa ou ativa conforme regras', () => {
    renderWithRouterAndRedux(<App/>);

    const nameInput = screen.getByLabelText('Nome:');
    const emailInput = screen.getByLabelText('Email:');
    const playBtn = screen.getByRole('button', { name: 'Play' });

    const emailCorrect = 'teste@teste.com';
    const nameCorrect = 'alguem';

    expect(playBtn).toBeDisabled();

    userEvent.type(nameInput, nameCorrect);
    userEvent.type(emailInput, emailCorrect);

    expect(playBtn).toBeEnabled();

    userEvent.clear(nameInput);

    expect(playBtn).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.type(nameInput, nameCorrect);

    expect(playBtn).toBeDisabled();
  });
});
