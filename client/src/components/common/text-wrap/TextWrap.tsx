import React, { useState, useMemo, useCallback } from 'react';
import { Link } from '@material-ui/core';

type TextWrapProps = {
  text: string;
  maxLength?: number;
  defaultWrap?: boolean;
};

export const TextWrap: React.FC<TextWrapProps> = ({
  text,
  maxLength = 200,
  defaultWrap = true,
}) => {
  const [wrap, setWrap] = useState<boolean>(defaultWrap);
  const isEnabled = useMemo(() => text.length > maxLength, [text, maxLength]);
  const isWrapped = useMemo(() => wrap && isEnabled, [wrap, isEnabled]);
  const finalText = useMemo(
    () => (isWrapped ? `${text.slice(0, maxLength)}...` : text),
    [text, isWrapped, maxLength]
  );
  const onClick = useCallback(() => setWrap(!wrap), [wrap, setWrap]);
  return (
    <>
      {finalText}
      {isEnabled && (
        <>
          {' '}
          <Link
            component="button"
            variant="body2"
            color="primary"
            onClick={onClick}
          >
            {wrap ? 'Show more' : 'Show less'}
          </Link>
        </>
      )}
    </>
  );
};
