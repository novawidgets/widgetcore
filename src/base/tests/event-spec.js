define(['module/base/1.0.0/base'], function(Base) {
    Base = Base || this.Base;
   
    describe('Events', function() {
        describe('on, off, trigger', function() {
            it('callback should be executed when its triggered', function() {
                var callback = sinon.spy();
                var ins = new Base();
                ins.on('activate', callback);
                ins.trigger('activate');
                expect(callback.callCount).to.equal(1);
            });
            it('callback should be executed twice when its bound twice', function() {
                var callback = sinon.spy();
                var ins = new Base();
                ins.on('activate', callback);
                ins.on('activate', callback);
                ins.trigger('activate');
                expect(callback.callCount).to.equal(2);
            });
            it('off() should unbind all handlers', function() {
                var callback = sinon.spy();
                var callback2 = sinon.spy();
                var ins = new Base();
                ins.on('activate', callback);
                ins.on('activate', callback2);
                ins.off();
                ins.trigger('activate');
                expect(callback.callCount).to.equal(0);
                expect(callback2.callCount).to.equal(0);
            });
            it('off(evenType, fun) should unbind the specific handlers', function() {
                var callback = sinon.spy();
                var callback2 = sinon.spy();
                var ins = new Base();
                ins.on('activate', callback);
                ins.on('reset', callback2);
                ins.off('activate');
                ins.trigger('activate reset');
                expect(callback.callCount).to.equal(0);
                expect(callback2.callCount).to.equal(1);
                ins.on('reset', callback);
                ins.off('reset', callback2);
                ins.trigger('reset');
                expect(callback.callCount).to.equal(1);
                expect(callback2.callCount).to.equal(1);
            });
            it('event type witten in this format [\'activate\', \'reset\'] should work correctly', function() {
                var callback = sinon.spy();
                var ins = new Base();
                ins.on('activate reset', callback);
                ins.trigger('activate reset');
                expect(callback.callCount).to.equal(2);
                ins.off('activate reset');
                ins.trigger('activate reset');
                expect(callback.callCount).to.equal(2);
            });
            it('an event should generate a public event object for its handlers', function() {
                var tempEv;
                var ins = new Base();

                ins.on('test', function(ev) {
                    tempEv = ev;
                });
                ins.on('test', function(ev) {
                    expect(ev).to.equal(tempEv);
                });
            });
            it('ev.preventDefault() should prevent the after bound handlers', function() {
                var callback = sinon.spy();
                var ins = new Base();

                ins.on('test', function(ev) {
                    ev.preventDefault();
                })
                ins.on('test', callback);

                ins.trigger('test');
                expect(callback.callCount).to.equal(0);
            });
            it('a false return value should prevent the after bound handlers', function() {
                var callback = sinon.spy();
                var ins = new Base();

                ins.on('test', function(ev) {
                    return false;
                })
                ins.on('test', callback);

                ins.trigger('test');
                expect(callback.callCount).to.equal(0);
            });
        });

        describe('context', function() {
            it('should be the base instance when context is not passed in', function() {
                var ins = new Base();
                ins.on('activate', function() {
                    expect(this).equal(ins); 
                });
                ins.trigger('activate');
            });
            it('should be the passed in context when its not null', function() {
                var ins = new Base();
                var ctx = {say: 'hello'}
                ins.on('activate', function() {
                    expect(this).equal(ctx); 
                }, ctx);
                ins.trigger('activate');
            });
        });        

        describe('callback(ev, [,args])', function() {
                it('its first arguments ev should have correct timeStamp, target, type properties', function() {
                    var ins = new Base();
                    ins.on('activate', function(ev, arg1, arg2, arg3) {
                       expect(ev).be.a('object');
                       expect(ev.timeStamp).be.a('number');
                       expect(ev.target).equal(ins);
                       expect(ev.type).equal('activate');
                    });
                    ins.trigger('activate', [1, 2]);
                });
                it('its arguments should match whats passed by trigger', function() {
                    var ins = new Base();
                    ins.on('activate', function(ev, arg1, arg2, arg3) {
                        expect(arg1).equal(1);
                        expect(arg2).equal(2);
                        expect(arg3).to.equal(undefined);
                    });
                    ins.trigger('activate', [1, 2]);
                });
                it('should be trigger in the order when its bound', function() {
                    var ins = new Base();
                    var a = 0;
                    ins.on('activate', function() {
                        a = 1;
                    });
                    ins.on('activate', function() {
                        a = 2;
                    });
                    ins.trigger('activate');
                    expect(a).to.equal(2);
                });
        });

    })

});
