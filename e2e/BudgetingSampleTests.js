var assert = require('assert');

describe('Verify Add Category', function() {
    it('Verify Category is added and outflow is changed', function() {
        browser.url('http://localhost:3000/budget');
        // Fetch current outflow value
        var oldOutflow = browser.getText('div[class="sG1fB _15b6X"]');
        var oldOutflowValue = oldOutflow.substring(1, oldOutflow.length);
        oldOutflowValue = oldOutflowValue.split(',').join('');

        //Generate random description
        var generatedDescription = Math.random().toString(36).substring(2);

        var categorySelector = browser.element('[name="categoryId"]');
        categorySelector.selectByAttribute('value', '5');
        browser.setValue('//input[@name="description"]', generatedDescription);
        browser.setValue('//input[@name="value"]','1500');
        browser.click('button=Add');

        //Fetch the value in last row of table
        var lastRow = browser.element('(//tbody/tr)[last()]');
        var category = lastRow.element('//td[1]').getText('div[class="_3-t-g"]');
        var description = lastRow.element('//td[2]').getText('div[class="_3-t-g"]');
        var amount = lastRow.element('//td[3]').getText('div[class="_3-t-g"]');

        //verify if values in rows match as expected
        assert.equal(category, 'Kids', 'The Category is not correct');
        assert.equal(description, generatedDescription, 'The Description is not correct');
        assert.equal(amount, '-$1,500.00', 'The Amount is not correct');

        //Calculate new outflow value and verify
        var calculatedNewOutflow = parseFloat(oldOutflowValue) + 1500;
        var calculatedNewOutflow = '$' + calculatedNewOutflow.toString();
        var newOutflow = browser.getText('div[class="sG1fB _15b6X"]').replace(/,/g, '');

        assert.equal(calculatedNewOutflow, newOutflow, 'The old outflow and new outflow do not match');


    });
});

describe('Verify Reports Inflow vs Outflow', function() {
    it('Verify Category is added and outflow is changed', function() {
        browser.url('http://localhost:3000/budget');
        //Fetch inflow and outflow values
        var inflow = browser.getText('(//div[@class="sG1fB _1yrus"])[position()=1]');
        var outflow = browser.getText('div[class="sG1fB _15b6X"]');
        browser.click('a[href="/reports"]');

        //Verify inflow outflow bars exist
        isExisting = browser.isExisting('<rect>');
        assert.equal(isExisting, true, 'The inflow/outflow bars do not exist');

        //Get inflow and outflow values on reports page
        var values = browser.getText('text[class="_1UVu9"]');
        assert.equal(inflow,values[0], 'Values for inflow on the budget screen and reports screen do not match');
        assert.equal(outflow,values[1], 'Values for outflow on the budget screen and reports screen do not match');


    });
});

describe('Verify Negative Test case', function() {
    it('Verify decimal values can be entered with ENTER key', function() {
        browser.url('http://localhost:3000/budget');

        //Generate random description
        var generatedDescription = Math.random().toString(36).substring(2);

        var categorySelector = browser.element('[name="categoryId"]');
        categorySelector.selectByAttribute('value', '5');
        browser.setValue('//input[@name="description"]', generatedDescription);
        browser.setValue('//input[@name="value"]','1500.76');
        //Press Enter key instead of Add button
        browser.keys("\uE007");
        var lastRow = browser.element('(//tbody/tr)[last()]');
        var category = lastRow.element('//td[1]').getText('div[class="_3-t-g"]');
        var description = lastRow.element('//td[2]').getText('div[class="_3-t-g"]');
        var amount = lastRow.element('//td[3]').getText('div[class="_3-t-g"]');

        assert.equal(category, 'Kids', 'The Category did not match');
        assert.equal(description, generatedDescription, 'The Description did not match');
        assert.equal(amount, '-$1,500.00', 'The Amount did not match');
    });
});
