import React from 'react';

function DashboardScreen() {
  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h4 className="display-6 fw-bold text-success mb-1">Your Sustainability Impact</h4>
        <p className="text-muted">Track your environmental contributions</p>
      </div>
      
      <div className="card mb-4 border-0 bg-light">
        <div className="card-body text-center p-5">
          <div className="eco-score mb-3" style={{
            width: '220px',
            height: '220px',
            borderWidth: '18px',
            boxShadow: '0 4px 15px rgba(46, 204, 113, 0.2)'
          }}>
            <h2 className="display-3 mb-0 fw-bold">75</h2>
            <div className="text-muted">Eco Score</div>
          </div>
          <p className="text-success mt-3 mb-0">
            <i className="fas fa-arrow-up me-1"></i>
            12% improvement from last month
          </p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-4">
          <div className="card h-100 border-0 bg-light hover-shadow">
            <div className="card-body text-center p-4">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 mb-3 mx-auto" style={{width: '60px', height: '60px'}}>
                <i className="fas fa-recycle text-success fa-2x"></i>
              </div>
              <h3 className="h2 mb-2">156</h3>
              <div className="text-muted">Items Recycled</div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card h-100 border-0 bg-light hover-shadow">
            <div className="card-body text-center p-4">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 mb-3 mx-auto" style={{width: '60px', height: '60px'}}>
                <i className="fas fa-cloud text-success fa-2x"></i>
              </div>
              <h3 className="h2 mb-2">325<small>kg</small></h3>
              <div className="text-muted">Carbon Saved</div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card h-100 border-0 bg-light hover-shadow">
            <div className="card-body text-center p-4">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 mb-3 mx-auto" style={{width: '60px', height: '60px'}}>
                <i className="fas fa-bolt text-success fa-2x"></i>
              </div>
              <h3 className="h2 mb-2">482<small>kWh</small></h3>
              <div className="text-muted">Energy Saved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen; 