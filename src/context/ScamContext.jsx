import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialScams } from '../data/mockScams';

const ScamContext = createContext();

const STORAGE_KEY = 'scamshield_reports_v2';
const VOTES_KEY = 'scamshield_user_voted';

export const ScamProvider = ({ children }) => {
  const [scams, setScams] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return initialScams;
  });

  const [votedScams, setVotedScams] = useState(() => {
    try {
      const saved = localStorage.getItem(VOTES_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scams));
    } catch (e) {
      console.error('Failed to save scams to localStorage', e);
    }
  }, [scams]);

  useEffect(() => {
    try {
      localStorage.setItem(VOTES_KEY, JSON.stringify(votedScams));
    } catch (e) {
      console.error('Failed to save votes to localStorage', e);
    }
  }, [votedScams]);

  const addReport = (newReportData) => {
    const newEntry = {
      id: `scam-${Date.now().toString().slice(-4)}`,
      title: newReportData.title,
      scamType: newReportData.scamType,
      identifier: newReportData.identifier,
      secondaryIdentifier: newReportData.secondaryIdentifier || '',
      threatLevel: newReportData.threatLevel || 'High',
      incidentDate: newReportData.incidentDate || new Date().toISOString().split('T')[0],
      reportedBy: newReportData.reportedBy || 'Anonymous Contributor',
      meTooCount: 1,
      summary: newReportData.description.slice(0, 140) + (newReportData.description.length > 140 ? '...' : ''),
      description: newReportData.description,
      redFlags: newReportData.redFlags || [
        "Unsolicited communication",
        "High pressure to act immediately",
        "Demanding sensitive financial or personal data"
      ],
      preventionTip: newReportData.preventionTip || "Always independently verify before providing sensitive information or payments.",
      proofImage: newReportData.proofImage || null,
      proofFileName: newReportData.proofFileName || null
    };

    setScams((prev) => [newEntry, ...prev]);
    return newEntry;
  };

  const incrementMeToo = (id) => {
    setScams((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const hasVoted = !!votedScams[id];
          const updatedCount = hasVoted ? Math.max(0, item.meTooCount - 1) : item.meTooCount + 1;
          return { ...item, meTooCount: updatedCount };
        }
        return item;
      })
    );

    setVotedScams((prev) => {
      const isCurrentlyVoted = !!prev[id];
      const updated = { ...prev };
      if (isCurrentlyVoted) {
        delete updated[id];
      } else {
        updated[id] = true;
      }
      return updated;
    });
  };

  const hasVotedFor = (id) => {
    return !!votedScams[id];
  };

  const getScamById = (id) => {
    return scams.find((item) => item.id === id);
  };

  const searchScams = (query) => {
    if (!query || !query.trim()) return scams;
    const cleanQuery = query.toLowerCase().trim();
    return scams.filter((item) => {
      const matchIdentifier = item.identifier?.toLowerCase().includes(cleanQuery);
      const matchSecondary = item.secondaryIdentifier?.toLowerCase().includes(cleanQuery);
      const matchTitle = item.title?.toLowerCase().includes(cleanQuery);
      const matchDescription = item.description?.toLowerCase().includes(cleanQuery);
      const matchType = item.scamType?.toLowerCase().includes(cleanQuery);
      return matchIdentifier || matchSecondary || matchTitle || matchDescription || matchType;
    });
  };

  // Reset to original verified baseline threat dataset
  const resetToSampleData = () => {
    setScams(initialScams);
    setVotedScams({});
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(VOTES_KEY);
  };

  return (
    <ScamContext.Provider
      value={{
        scams,
        addReport,
        incrementMeToo,
        hasVotedFor,
        getScamById,
        searchScams,
        resetToSampleData
      }}
    >
      {children}
    </ScamContext.Provider>
  );
};

export const useScams = () => {
  const context = useContext(ScamContext);
  if (!context) {
    throw new Error('useScams must be used within a ScamProvider');
  }
  return context;
};
