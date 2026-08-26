const { EdgeTTS } = require('@andresaya/edge-tts');

// Microsoft Edge's "Read Aloud" neural voices. One dedicated male voice per
// language the app supports (Azure Neural TTS voice names).
const MALE_VOICES = {
  english: 'en-IN-PrabhatNeural',
  telugu: 'te-IN-MohanNeural',
  hindi: 'hi-IN-MadhurNeural'
};

const MAX_CHARS = 4000;

exports.speak = async (req, res) => {
  const text = String(req.query.text || '').trim();
  const lang = String(req.query.lang || 'english').trim().toLowerCase();

  if (!text) {
    return res.status(400).json({ error: 'text is required' });
  }
  if (text.length > MAX_CHARS) {
    return res.status(400).json({ error: `text must be ${MAX_CHARS} characters or fewer` });
  }

  const voice = MALE_VOICES[lang] || MALE_VOICES.english;

  try {
    const tts = new EdgeTTS();
    await tts.synthesize(text, voice, { rate: '0%', pitch: '0Hz', volume: '0%' });
    const buffer = await tts.toBuffer();

    res.set('Content-Type', 'audio/mpeg');
    res.set('Cache-Control', 'public, max-age=86400');
    res.send(buffer);
  } catch (err) {
    console.error('TTS proxy error:', err.message);
    res.status(502).json({ error: 'Could not reach the text-to-speech service' });
  }
};
