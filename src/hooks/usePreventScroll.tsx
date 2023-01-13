import { useRef } from 'react';

const safeDocument = typeof document !== 'undefined' ? document : {
  documentElement: undefined,
  body: undefined,
};

/**
 * Usage:
 * const [blockScroll, allowScroll] = useScrollBlock();
 */
export const usePreventScroll = () => {
  const scrollBlocked = useRef(false);
  const html = safeDocument.documentElement;
  const { body } = safeDocument;

  const disableScroll = () => {
    if (!body || !body.style || scrollBlocked.current) return;

    const scrollBarWidth = window.innerWidth - html!.clientWidth;
    const bodyPaddingRight = parseInt(window.getComputedStyle(body).getPropertyValue('padding-right'), 10) || 0;

    /**
     * 1. Fixes a bug in iOS and desktop Safari whereby setting
     *    `overflow: hidden` on the html/body does not prevent scrolling.
     * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
     *    scroll if an `overflow-x` style is also applied to the body.
     */
    html!.style.position = 'relative'; /* [1] */
    html!.style.overflow = 'hidden'; /* [2] */
    body.style.position = 'relative'; /* [1] */
    body.style.overflow = 'hidden'; /* [2] */
    body.style.paddingRight = '0';

    scrollBlocked.current = true;
  };

  const enableScroll = () => {
    if (!body || !body.style || !scrollBlocked.current) return;

    html!.style.position = '';
    html!.style.overflow = '';
    body.style.position = '';
    body.style.overflow = '';
    body.style.paddingRight = '';

    scrollBlocked.current = false;
  };

  const allowScroll = (allow: boolean) => {
    if (allow) enableScroll();
    else disableScroll();
  };

  return [allowScroll];
};
