/** 模拟流式输出，用于问答打字机效果（后续可替换为 SSE） */
export async function mockStreamText(
  text: string,
  onChunk: (partial: string) => void,
  intervalMs = 28
): Promise<void> {
  let partial = "";
  for (const char of text) {
    partial += char;
    onChunk(partial);
    await new Promise((resolve) => setTimeout(resolve, intervalMs));

  }
}

