import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          cover: 'img1.png',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          cover: 'img2.png',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
          cover: 'img3.png',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home/>', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts, { timeout: 5000 });

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });

    if (images.length === 2) {
      expect(images).toHaveLength(2);
    } else {
      expect(images).toHaveLength(1);
    }

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should seerch for posts', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts');

    expect.assertions(10);

    await waitForElementToBeRemoved(noMorePosts, { timeout: 5000 });

    const search = screen.getByPlaceholderText(/type your search/i);

    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();

    userEvent.type(search, 'title1');

    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Buscando: title1' })).toBeInTheDocument();

    userEvent.clear(search);

    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();

    userEvent.type(search, 'post does not exist');
    expect(screen.getByText('Não existem posts')).toBeInTheDocument();
  });
  it('should load more posts when click the button', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts');

    expect.assertions(2);

    await waitForElementToBeRemoved(noMorePosts, { timeout: 5000 });

    const button = screen.getByRole('button', { name: /load more posts/i });

    fireEvent.click(button);

    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
