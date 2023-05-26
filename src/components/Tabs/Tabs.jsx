import { useState } from 'react';
import './Tabs.css';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const renderTabContent = () => {
    const currentTab = tabs[activeTab];
    return currentTab ? currentTab.component : null;
  };

  return (
    <div className='tabsContainer'>
      <div>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab${activeTab === index ? 'active' : ''}`}
            onClick={() => handleTabChange(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      {renderTabContent()}
    </div>
  );
};

export default Tabs;
