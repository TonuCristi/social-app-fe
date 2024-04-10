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
    max-width: 100%;
  `,
  profile: css`
    width: 15rem;
    height: 15rem;
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

type Props = {
  src: string;
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
