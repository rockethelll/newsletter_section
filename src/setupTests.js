import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

globalThis.render = render;
globalThis.screen = screen;
