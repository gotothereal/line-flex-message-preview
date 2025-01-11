const buildFlexMessage = (sections) => {
  return {
    type: 'flex',
    altText: 'Flex Message',
    contents: {
      type: 'carousel',
      contents: sections.map((section) => ({
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: section.boxes.map((box) => ({
            type: 'box',
            layout: box.type,
            backgroundColor: box.backgroundColor,
            padding: box.padding,
            contents: box.contents,
          })),
        },
      })),
    },
  };
};

const validateFlexMessage = (flexMessage) => {
  // 基本的な構造の検証
  if (!flexMessage || typeof flexMessage !== 'object') {
    return { isValid: false, error: 'FlexMessageはオブジェクトである必要があります' };
  }

  if (flexMessage.type !== 'flex') {
    return { isValid: false, error: 'typeはflexである必要があります' };
  }

  if (!flexMessage.contents || typeof flexMessage.contents !== 'object') {
    return { isValid: false, error: 'contentsは必須です' };
  }

  // カルーセルの検証
  const { contents } = flexMessage;
  if (contents.type !== 'carousel') {
    return { isValid: false, error: 'contents.typeはcarouselである必要があります' };
  }

  if (!Array.isArray(contents.contents)) {
    return { isValid: false, error: 'contents.contentsは配列である必要があります' };
  }

  // 各バブルの検証
  for (let i = 0; i < contents.contents.length; i++) {
    const bubble = contents.contents[i];
    if (bubble.type !== 'bubble') {
      return { isValid: false, error: `バブル${i}のtypeはbubbleである必要があります` };
    }

    if (!bubble.body || !bubble.body.contents) {
      return { isValid: false, error: `バブル${i}にbodyとcontentsが必要です` };
    }
  }

  return { isValid: true };
};

export { buildFlexMessage, validateFlexMessage }; 