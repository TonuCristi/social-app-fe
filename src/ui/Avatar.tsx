import { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import styled, { css } from "styled-components";

type Variant = "profileBadge" | "post" | "postForm" | "profile";

const variants = {
  profileBadge: css`
    width: 4rem;
    height: 4rem;
  `,
  post: css`
    width: 4rem;
    height: 4rem;
  `,
  postForm: css`
    width: 4rem;
    height: 4rem;

    @media (width <= 1023px) {
      & {
        width: 3rem;
        height: 3rem;
      }
    }
  `,
  profile: css`
    width: 15rem;
    height: 15rem;

    @media (width <= 1279px) {
      & {
        width: 10rem;
        height: 10rem;
      }
    }
  `,
};

const StyledAvatar = styled.img<{ $variant: Variant }>`
  border-radius: 100%;
  ${(props) => variants[props.$variant]}
`;

const NoAvatar = styled.div<{ $variant: Variant }>`
  border-radius: 100%;
  background-color: var(--color-zinc-900);
  ${(props) => variants[props.$variant]}
`;

type Props = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  name?: string;
  variant: Variant;
};

export default function Avatar({ src, name, variant }: Props) {
  return (
    <>
      {src ? (
        <StyledAvatar
          src={src}
          alt={`Photo of ${name ? name : "you"}`}
          $variant={variant}
        />
      ) : (
        <NoAvatar $variant={variant} />
      )}
    </>
  );
}
