/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react"
import { PostCard } from "."

const props = {
    title: 'title 1',
    body: 'body 1',
    id: 1,
    cover: 'img/img.png'
};

describe("<PostCard />", () => {
    it("should render PostCard correctly", () => {
        render(<PostCard {...props}/>);

        const img = screen.getByRole('img', { name: /title 1/i });
        const heading = screen.getByRole('heading', { name: /title 1/i });
        const paragraph = screen.getByText('body 1');

        expect(img).toHaveAttribute('src', props.cover);
        expect(heading).toBeInTheDocument();
        expect(paragraph).toBeInTheDocument();
    })

    it("should match snapshot", () => {
        const { container } = render(<PostCard {...props}/>);

        expect(container.firstChild).toMatchSnapshot();
    })
})