import { render, screen } from '@testing-library/react';
import Upload from './components/Upload';

/**
 * Testing based on/around file upload, especially in this
 * implementation where:
 * 1) most of the app does not exist until a file has been uploaded
 * 2) component state changes occur upon file upload
 * appear to be trickier then I would like, so only testing
 * initial render for now.
 */
test('renders the upload button', () => {
  render(<Upload buttonText='Click or Drag excel/csv file here' />);
  const button = screen.getByText('Click or Drag excel/csv file here');
  expect(button).toBeInTheDocument();
});
