/**
 * TEST FIXTURES for the testimonials carousel. Not content: every string is
 * marked as test data, and these only render on /_fixtures/named, which is
 * deleted before launch (BUILD_PLAN 5.1). Real quotes go in
 * src/content/testimonials.ts, with written permission.
 */
export const fixtureTestimonials = [1, 2, 3].map((n) => ({
  quote: `Sample quote ${n} (test data). Never shown on the live site.`,
  name: `Test person ${n}`,
  role: "Test role",
  company: "Test company",
}));
