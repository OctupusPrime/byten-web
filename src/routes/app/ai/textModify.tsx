import { Route } from "@tanstack/router";
import { appAiRoute } from ".";

export const appAiTextModifyRoute = new Route({
  getParentRoute: () => appAiRoute,
  path: "/",
  component: TextModify,
});

function TextModify() {
  return (
    <>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi,
        commodi. Aut pariatur eius perferendis magni corporis excepturi,
        voluptate quia sequi obcaecati, est dignissimos doloribus quaerat. Autem
        commodi ut aspernatur explicabo magnam soluta eius hic quaerat nobis
        atque accusamus minus mollitia enim maxime qui cumque tempore, incidunt
        natus alias nam, ea recusandae libero sit! Aliquam, est quo. Ipsum non
        nesciunt neque deleniti saepe amet soluta numquam vitae. Perspiciatis
        eos voluptas repellat. Nam explicabo iste laudantium. Inventore,
        reiciendis est et, optio ullam dolorum sint delectus suscipit provident
        ea facilis aperiam atque qui eius dolor alias eos quibusdam voluptatum
        repellat beatae. Eligendi deleniti, id blanditiis voluptates porro
        molestias dolores doloremque. Magni voluptatibus non vel quas ullam ipsa
        iusto laboriosam quod facilis? Temporibus laboriosam modi quaerat quis
        vero, maiores, deleniti dicta et id natus, adipisci aliquam. In soluta
        architecto beatae nisi vel unde? Excepturi non aliquid error! Doloribus
        deserunt soluta eius sit molestias repudiandae.
      </p>
    </>
  );
}
