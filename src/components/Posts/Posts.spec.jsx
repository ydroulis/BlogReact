import { render, screen } from '@testing-library/react';
import { Posts } from '.';

const props = {
  posts: [
    {
      id: 1,
      title: 'title 1',
      body: 'body 1',
      cover: 'img/img1.png',
    },
    {
      id: 2,
      title: 'title 2',
      body: 'body 2',
      cover: 'img/img2.png',
    },
    {
      id: 3,
      title: 'title 3',
      body: 'body 3',
      cover: 'img/img3.png',
    },
  ],
};

describe('<Posts/>', () => {
  it('should render Posts', () => {
    render(<Posts {...props} />);

    const allHeadings = screen.getAllByRole('heading', { name: /title/i });
    const allImg = screen.getAllByRole('img', { name: /title/i });
    const allParagraphs = screen.getAllByText(/body/i);

    expect(allHeadings).toHaveLength(3);
    expect(allImg).toHaveLength(3);
    expect(allParagraphs).toHaveLength(3);
  });

  it('should match snapshot', () => {
    const { container } = render(<Posts {...props} />);

    expect(container).toMatchSnapshot();
  });
});
