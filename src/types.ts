/**
 * App-local UI types.
 *
 * Domain types (Listing, Order, CartItem, Review, User) now live in
 * `@arli/contracts` and are shared with the API and the other three apps.
 * What remains here is presentation-only, which does not belong in a contract.
 */

/** A chat bubble. `align`/`bg`/`fg` are styling, not domain data. */
export interface Message {
  align: 'flex-start' | 'flex-end';
  bg: string;
  fg: string;
  text: string;
}
