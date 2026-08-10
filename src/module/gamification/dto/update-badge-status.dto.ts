/**
 * Optional body of `PATCH /gamification/:projectId/badge/:id/status/:status`.
 *
 * Only meaningful when moving a badge to `faded`: it carries the window the
 * countdown is drawn from. The status itself stays in the path so the
 * existing route shape keeps working.
 */
export class UpdateBadgeStatusDto {
  /** ISO-8601 instant when the fading window closes. Required for `faded`. */
  expiresAt?: string;

  /** Motive shown to the community next to the countdown. */
  fadeReason?: string;
}
