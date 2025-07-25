import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TaskSkeleton from '../components/TaskSkeleton';

describe('TaskSkeleton', () => {
  it('renders the correct number of skeleton items', () => {
    render(<TaskSkeleton count={4} />);
    const skeletons = screen.getAllByTestId('task-skeleton');
    expect(skeletons).toHaveLength(4);
  });
});
