import { LIKE_PRODUCT } from "@/graphql/products/mutation";
import { gql, useMutation } from "@apollo/client";

export default function useLikeProduct() {
  const [likeProduct, { loading: likeLoading }] = useMutation(LIKE_PRODUCT, {
    optimisticResponse: (variables) => {
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
            return [...existingLikes, newLikeRef];
          },
        },
      });
    },
  });

  return { likeProduct, likeLoading };
}
