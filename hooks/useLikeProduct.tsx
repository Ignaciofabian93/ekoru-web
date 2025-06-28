import { LIKE_PRODUCT } from "@/graphql/products/mutation";
import { gql, useMutation } from "@apollo/client";

export default function useLikeProduct() {
  const [likeProduct, { loading: likeLoading }] = useMutation(LIKE_PRODUCT, {
    optimisticResponse: (variables) => {
      console.log("Optimistic response for liking product:", variables);

      return {
        likeProduct: {
          __typename: "ProductLike",
          id: variables.id,
          userId: variables.userId,
        },
      };
    },
    update(cache, { data: { likeProduct } }) {
      // Identify the product in the cache
      const productId = likeProduct.id; // The product's id
      console.log("Updating cache for product ID:", productId);

      cache.modify({
        id: cache.identify({ __typename: "Product", id: productId }),
        fields: {
          likes(existingLikes = []) {
            // Prevent duplicate likes by user
            if (existingLikes.some((like: { id: number; userId: string }) => like.userId === likeProduct.userId)) {
              return existingLikes;
            }
            // Write the new like to the cache
            const newLikeRef = cache.writeFragment({
              data: likeProduct,
              fragment: gql`
                fragment NewLike on ProductLike {
                  id
                  userId
                }
              `,
            });
            console.log("Adding new like to existing likes:", newLikeRef);

            return [...existingLikes, newLikeRef];
          },
        },
      });
    },
  });

  return { likeProduct, likeLoading };
}
