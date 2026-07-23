import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { useState } from 'react';

const ExportActions = ({ onExport, onReset }) => {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleResetConfirm = () => {
    onReset();
    setIsResetModalOpen(false);
  };

  return (
    <>
      <Card className="mt-8 bg-white/[0.02] border-white/[0.04]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-display font-bold text-white">System Actions</h3>
            <p className="text-sm text-white/50">Manage all system data</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={onExport} icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            }>
              Export Full Report (CSV)
            </Button>
            <Button variant="danger" onClick={() => setIsResetModalOpen(true)}>
              Reset System Data
            </Button>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetConfirm}
        title="Reset All Data?"
        message="Are you absolutely sure? This will delete all suggestions, nominations, and business promotions. This action cannot be undone."
        confirmText="Yes, Reset Data"
        confirmVariant="danger"
      >
        <div className="mt-4 p-3 bg-red-500/10 text-red-400 rounded-md border border-red-500/20 text-sm">
          <strong className="text-red-300">Warning:</strong> Ensure you have exported the data before proceeding.
        </div>
      </Modal>
    </>
  );
};

export default ExportActions;
