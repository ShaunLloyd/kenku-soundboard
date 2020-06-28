import findExececutable from "find-exec";
import { spawnSync } from "child_process";

const SYSTEM_AUDIO_PLAYERS = [
  "mplayer",
  "afplay",
  "mpg123",
  "mpg321",
  "play",
  "omxplayer",
  "aplay",
  "cmdmp3",
] as const;

type SystemAudioPlayer = typeof SYSTEM_AUDIO_PLAYERS[number];

const findSystemAudioPlayer = (customPriority?: SystemAudioPlayer[]) => {
  const player = findExececutable(
    customPriority ? customPriority : [...SYSTEM_AUDIO_PLAYERS]
  );

  return player !== null ? (player as SystemAudioPlayer) : undefined;
};

const createPlaySound = (player: SystemAudioPlayer) => (filePath: string) => {
  const audioProcess = spawnSync(player, [filePath]);

  if (audioProcess.error) {
    console.error(audioProcess.error);
  }

  return !audioProcess.error;
};

const createPlaySoundsInSequence = (player: SystemAudioPlayer) => {
  const playSound = createPlaySound(player);

  return (...filePaths: string[]) =>
    filePaths.every((filePath) => playSound(filePath));
};

export const createLocalAudioPlayer = (
  customPriority?: SystemAudioPlayer[]
) => {
  const audioPlayer = findSystemAudioPlayer(customPriority);

  if (!audioPlayer) {
    throw new Error("No audio player was found");
  }

  return {
    playSound: createPlaySound(audioPlayer),
    playSoundsInSequence: createPlaySoundsInSequence(audioPlayer),
  };
};
