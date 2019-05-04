from selenium import webdriver


chromedriver = "/Users/euiwonkim/Downloads/chromedriver"
driver = webdriver.Chrome(chromedriver)
driver.get("http://www.xivinvestment.com/")

#signal = driver.find_element_by_id("theSig")
signal = driver.find_elements_by_xpath("//span[contains(@id,'theSig')]/span")

print signal